
    import React, { useState } from 'react';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { Label } from '@/components/ui/label';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Users, Tag, PlusCircle, Upload, Loader2, CheckCircle } from 'lucide-react';
    import AddContactForm from './AddContactForm';
    import CsvUploadDialog from './CsvUploadDialog';

    const AudienceSelector = ({ contacts, loading, onTagChange, onSelectContact, selectedContacts, tag, onContactsUpdated, allTags }) => {
        const [showAddContact, setShowAddContact] = useState(false);
        const [showCsvUpload, setShowCsvUpload] = useState(false);

        const contactsWithTag = React.useMemo(() => {
            if (!tag) return [];
            const lowerCaseTag = tag.trim().toLowerCase();
            return contacts.filter(c => c.tags?.some(t => t && t.toLowerCase() === lowerCaseTag));
        }, [tag, contacts]);

        const targetCount = tag ? contactsWithTag.length : selectedContacts.length;

        const handleCsvUploadClick = () => {
            setShowCsvUpload(true);
        };

        const handleCsvDialogClose = () => {
            setShowCsvUpload(false);
        };

        const handleCsvUploadComplete = () => {
            onContactsUpdated();
            setShowCsvUpload(false);
        };

        return (
            <>
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Users className="w-6 h-6 text-primary"/>
                            <CardTitle>Target Audience ({targetCount} selected)</CardTitle>
                        </div>
                        <CardDescription>Send to contacts with a specific tag OR select them individually.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="tag">Send by Tag</Label>
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 text-muted-foreground"/>
                                <Input id="tag" value={tag} onChange={(e) => onTagChange(e.target.value)} placeholder="e.g., new-leads (or select below)" />
                            </div>
                            {tag && <p className="text-sm text-muted-foreground mt-1">{contactsWithTag.length} contacts found with this tag.</p>}
                        </div>

                        <div className="text-center text-sm text-muted-foreground">OR</div>
                        
                        <div>
                            <Label>Select Individual Contacts</Label>
                            <div className="max-h-60 overflow-y-auto border rounded-md p-2 space-y-1">
                                {loading && <Loader2 className="mx-auto h-6 w-6 animate-spin" />}
                                {contacts.map(contact => (
                                    <div key={contact.id} className={`flex items-center justify-between p-2 rounded-md transition-colors ${selectedContacts.includes(contact.id) ? 'bg-primary/10' : 'hover:bg-muted/50'}`}>
                                        <div>
                                            <p className="font-medium">{contact.first_name} {contact.last_name}</p>
                                            <p className="text-sm text-muted-foreground">{contact.phone}</p>
                                        </div>
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant={selectedContacts.includes(contact.id) ? 'default' : 'outline'}
                                            onClick={() => onSelectContact(contact.id)}
                                        >
                                            <CheckCircle className="w-5 h-5"/>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                <Button type="button" variant="outline" size="sm" className="flex-1" onClick={() => setShowAddContact(true)}>
                                    <PlusCircle className="w-4 h-4 mr-2" /> Add New Contact
                                </Button>
                                <Button type="button" variant="outline" size="sm" className="flex-1" onClick={handleCsvUploadClick}>
                                    <Upload className="w-4 h-4 mr-2" /> Upload CSV
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <AddContactForm isOpen={showAddContact} onClose={() => setShowAddContact(false)} onContactAdded={onContactsUpdated} />
                <CsvUploadDialog isOpen={showCsvUpload} onClose={handleCsvDialogClose} onUploadComplete={handleCsvUploadComplete} />
            </>
        );
    };

    export default AudienceSelector;
  