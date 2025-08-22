
    import React, { useState } from 'react';
    import { supabase } from '@/lib/customSupabaseClient';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
    import { Loader2, Upload } from 'lucide-react';
    import Papa from 'papaparse';
    import { normalizePhoneNumber } from '@/lib/utils';

    const CsvUploadDialog = ({ isOpen, onClose, onUploadComplete }) => {
        const [file, setFile] = useState(null);
        const [isUploading, setIsUploading] = useState(false);
        const { toast } = useToast();

        const handleFileChange = (e) => {
            if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
            } else {
                setFile(null);
            }
        };

        const resetState = () => {
            setFile(null);
            setIsUploading(false);
        };

        const handleClose = () => {
            resetState();
            onClose();
        };

        const handleUpload = async () => {
            if (!file) {
                toast({ variant: 'destructive', title: 'No file selected', description: 'Please select a CSV file to upload.' });
                return;
            }

            setIsUploading(true);
            
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: async (results) => {
                    try {
                        const requiredHeaders = ['phone'];
                        const headers = results.meta.fields.map(h => h.toLowerCase());
                        if (!requiredHeaders.every(h => headers.includes(h))) {
                            throw new Error(`CSV must contain at least the following header: ${requiredHeaders.join(', ')}`);
                        }
                        
                        const contactsToInsert = results.data.map(row => {
                            const phoneKey = Object.keys(row).find(key => key.toLowerCase() === 'phone');
                            if (!phoneKey) return null;

                            const normalizedPhone = normalizePhoneNumber(row[phoneKey]);
                            if (!normalizedPhone) {
                                console.warn('Skipping row with invalid phone:', row);
                                return null;
                            }
                            
                            const firstNameKey = Object.keys(row).find(key => key.toLowerCase() === 'first_name');
                            const lastNameKey = Object.keys(row).find(key => key.toLowerCase() === 'last_name');
                            const emailKey = Object.keys(row).find(key => key.toLowerCase() === 'email');
                            const tagsKey = Object.keys(row).find(key => key.toLowerCase() === 'tags');

                            return {
                                phone: normalizedPhone,
                                first_name: firstNameKey ? row[firstNameKey] : null,
                                last_name: lastNameKey ? row[lastNameKey] : null,
                                email: emailKey ? row[emailKey] : null,
                                tags: tagsKey && row[tagsKey] ? row[tagsKey].split(',').map(t => t.trim().toLowerCase()) : [],
                            };
                        }).filter(Boolean);

                        if (contactsToInsert.length === 0) {
                             throw new Error('No valid contacts found. Check your CSV for valid phone numbers.');
                        }

                        const { error } = await supabase.from('contacts').upsert(contactsToInsert, { onConflict: 'phone' });

                        if (error) {
                            throw new Error(error.message);
                        }
                        
                        toast({ title: 'Upload Successful', description: `${contactsToInsert.length} contacts were processed.` });
                        onUploadComplete();
                        handleClose();
                    } catch (err) {
                        toast({ variant: 'destructive', title: 'Upload Failed', description: err.message });
                        setIsUploading(false);
                    }
                },
                error: (err) => {
                    toast({ variant: 'destructive', title: 'CSV Parsing Error', description: err.message });
                    setIsUploading(false);
                }
            });
        };
        
        return (
            <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload Contacts via CSV</DialogTitle>
                        <DialogDescription>
                            Select a CSV file to bulk-upload contacts. The file must contain a 'phone' column header. Optional headers: 'first_name', 'last_name', 'email', 'tags'.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input type="file" accept=".csv" onChange={handleFileChange} disabled={isUploading} />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={handleClose} disabled={isUploading}>Cancel</Button>
                        <Button onClick={handleUpload} disabled={isUploading || !file}>
                            {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Upload className="mr-2 h-4 w-4"/>}
                            {isUploading ? 'Processing...' : 'Upload and Process'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    export default CsvUploadDialog;
  