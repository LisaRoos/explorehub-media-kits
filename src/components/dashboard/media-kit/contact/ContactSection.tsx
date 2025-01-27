import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProfileData } from "@/types/profile";

interface ContactSectionProps {
  profile: ProfileData | null;
  refetchProfile: () => void;
  isEditable: boolean;
}

export const ContactSection = ({ profile, refetchProfile, isEditable }: ContactSectionProps) => {
  const [editingEmail, setEditingEmail] = useState(false);
  const [email, setEmail] = useState(profile?.email || "");

  const handleEmailSave = async () => {
    try {
      if (!profile?.id) return;

      const { error } = await supabase
        .from('profiles')
        .update({ email })
        .eq('id', profile.id);

      if (error) throw error;

      toast.success("Email updated successfully");
      setEditingEmail(false);
      refetchProfile();
    } catch (error) {
      console.error('Error updating email:', error);
      toast.error("Failed to update email");
    }
  };

  const handleEmailClick = () => {
    if (isEditable) {
      setEditingEmail(true);
    } else {
      window.location.href = `mailto:${email || 'contact@example.com'}`;
    }
  };

  return (
    <div className="space-y-3">
      {editingEmail && isEditable ? (
        <div className="space-y-2">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your contact email"
            className="w-full"
          />
          <div className="flex gap-2">
            <Button 
              onClick={handleEmailSave}
              className="flex-1"
            >
              Save
            </Button>
            <Button 
              variant="outline"
              onClick={() => setEditingEmail(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50"
          onClick={handleEmailClick}
        >
          <MessageCircle className="w-4 h-4" />
          {isEditable ? 'Edit Contact Email' : 'Chat Now'}
        </Button>
      )}
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50"
        onClick={() => window.location.href = '/dashboard/packages'}
      >
        <Package className="w-4 h-4" />
        View Packages
      </Button>
    </div>
  );
};