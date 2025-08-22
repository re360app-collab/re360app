import React, { useState, useEffect, useCallback } from 'react';
    import { supabase } from '@/lib/customSupabaseClient';
    import { Helmet } from 'react-helmet-async';
    import { useToast } from '@/components/ui/use-toast';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Badge } from '@/components/ui/badge';
    import { Loader2, Users, Search, AlertTriangle, PlusCircle, X, Check, Save } from 'lucide-react';
    import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
    } from "@/components/ui/dialog";
    import { Label } from "@/components/ui/label";

    const ContactsPage = () => {
      const [loading, setLoading] = useState(true);
      const [contacts, setContacts] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [error, setError] = useState(null);
      const [selectedContact, setSelectedContact] = useState(null);
      const [isEditing, setIsEditing] = useState(false);
      const [editFormData, setEditFormData] = useState({});
      const [newTag, setNewTag] = useState('');
      const { toast } = useToast();

      const fetchContacts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
          const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          setContacts(data);
        } catch (err) {
          setError(err.message);
          toast({ variant: 'destructive', title: 'Error fetching contacts', description: err.message });
        } finally {
          setLoading(false);
        }
      }, [toast]);

      useEffect(() => {
        fetchContacts();
      }, [fetchContacts]);

      const handleRowClick = (contact) => {
        setSelectedContact(contact);
        setEditFormData(contact);
        setIsEditing(true);
      };

      const handleSave = async () => {
        if (!selectedContact) return;
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('contacts')
            .update({ ...editFormData, tags: editFormData.tags.filter(t => t) })
            .eq('id', selectedContact.id)
            .select()
            .single();

          if (error) throw error;
          
          setContacts(contacts.map(c => c.id === data.id ? data : c));
          setSelectedContact(data);
          setIsEditing(false);
          toast({ title: 'Contact Updated', description: 'Contact details saved successfully.' });
        } catch (err) {
            toast({ variant: 'destructive', title: 'Error updating contact', description: err.message });
        } finally {
            setLoading(false);
        }
      };

      const handleAddTag = () => {
        if (newTag && !editFormData.tags.includes(newTag)) {
          setEditFormData(prev => ({ ...prev, tags: [...(prev.tags || []), newTag.trim().toLowerCase()] }));
          setNewTag('');
        }
      };
      
      const handleRemoveTag = (tagToRemove) => {
        setEditFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
      };
      
      const handleInputChange = (e) => {
          setEditFormData(prev => ({...prev, [e.target.name]: e.target.value}));
      }

      const filteredContacts = contacts.filter(c =>
        Object.values(c).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      return (
        <>
          <Helmet>
            <title>Contacts Management | RE360App Admin</title>
          </Helmet>
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Contacts</CardTitle>
                  <CardDescription>View and manage all SMS contacts.</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search all fields..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[250px] lg:w-[350px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : error ? (
                  <div className="text-center py-10 bg-red-50 rounded-lg">
                      <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
                      <h3 className="mt-2 text-sm font-medium text-red-800">Error loading contacts</h3>
                      <p className="mt-1 text-sm text-red-700">{error}</p>
                      <Button onClick={fetchContacts} className="mt-4">Retry</Button>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Phone</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Tags</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredContacts.map(contact => (
                          <TableRow key={contact.id} onClick={() => handleRowClick(contact)} className="cursor-pointer hover:bg-muted/50">
                            <TableCell className="font-mono">{contact.phone}</TableCell>
                            <TableCell>{contact.first_name} {contact.last_name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {contact.tags?.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                              </div>
                            </TableCell>
                            <TableCell>
                              {contact.registered && <Badge variant="default" className="bg-green-500 hover:bg-green-600">Registered</Badge>}
                              {contact.opted_out && <Badge variant="destructive">Opted Out</Badge>}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Edit Contact</DialogTitle>
                <DialogDescription>
                  Update contact details and manage tags. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              {editFormData && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Input id="first_name" name="first_name" value={editFormData.first_name || ''} onChange={handleInputChange} className="col-span-2" placeholder="First Name"/>
                      <Input id="last_name" name="last_name" value={editFormData.last_name || ''} onChange={handleInputChange} className="col-span-2" placeholder="Last Name"/>
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                       <Input id="email" name="email" value={editFormData.email || ''} onChange={handleInputChange} className="col-span-4" placeholder="Email Address"/>
                   </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
                      {(editFormData.tags || []).map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                          <button onClick={() => handleRemoveTag(tag)} className="ml-1.5 rounded-full hover:bg-destructive/20 p-0.5">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                        placeholder="Add a new tag..."
                      />
                      <Button onClick={handleAddTag} variant="outline" size="icon">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    };

    export default ContactsPage;