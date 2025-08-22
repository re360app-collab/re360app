
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tags } from 'lucide-react';

const AvailableTags = ({ tags, onTagSelect, currentTag }) => {
    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Tags className="w-6 h-6 text-primary"/>
                    <CardTitle>Available Tags</CardTitle>
                </div>
                <CardDescription>Click a tag to target contacts.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <Button 
                        key={tag} 
                        type="button" 
                        variant={currentTag === tag ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => onTagSelect(tag)}
                    >
                        {tag}
                    </Button>
                ))}
            </CardContent>
        </Card>
    );
};

export default AvailableTags;
