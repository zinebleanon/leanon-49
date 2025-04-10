
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Edit, MapPin, User, Cake, Briefcase, Heart, Users, Plus, Trash2, Camera } from 'lucide-react';
import { useUserInfo } from '@/hooks/use-user-info';
import { Separator } from '@/components/ui/separator';
import EditProfileDialog from '@/components/profile/EditProfileDialog';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Profile section types for the edit dialog
export type ProfileSection = 'basic' | 'contact' | 'personal' | 'photo' | 'all';

const Profile = () => {
  const { userInfo, removeKid, updateUserInfo } = useUserInfo();
  const [activeTab, setActiveTab] = useState('profile');
  const { toast } = useToast();
  
  // Edit dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDialogMode, setEditDialogMode] = useState<'profile' | 'kid'>('profile');
  const [editingKidIndex, setEditingKidIndex] = useState<number | undefined>(undefined);
  const [editDialogTitle, setEditDialogTitle] = useState('');
  const [editDialogDescription, setEditDialogDescription] = useState('');
  const [activeProfileSection, setActiveProfileSection] = useState<ProfileSection>('all');
  
  // Delete kid dialog
  const [deleteKidDialogOpen, setDeleteKidDialogOpen] = useState(false);
  const [deletingKidIndex, setDeletingKidIndex] = useState<number | undefined>(undefined);
  
  // File input ref for avatar upload
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  
  const openEditProfileDialog = (section: ProfileSection = 'all') => {
    setEditDialogMode('profile');
    setActiveProfileSection(section);
    
    let title = 'Edit Profile';
    let description = 'Update your personal information';
    
    switch (section) {
      case 'basic':
        title = 'Edit Basic Info';
        description = 'Update your name and basic information';
        break;
      case 'contact':
        title = 'Edit Contact Info';
        description = 'Update your email and phone information';
        break;
      case 'personal':
        title = 'Edit Personal Details';
        description = 'Update your bio, interests and work status';
        break;
      case 'photo':
        title = 'Change Profile Photo';
        description = 'Upload a new profile picture';
        break;
    }
    
    setEditDialogTitle(title);
    setEditDialogDescription(description);
    setEditDialogOpen(true);
  };
  
  const openEditKidDialog = (index?: number) => {
    setEditDialogMode('kid');
    setEditingKidIndex(index);
    
    if (index !== undefined) {
      setEditDialogTitle('Edit Child');
      setEditDialogDescription('Update your child\'s information');
    } else {
      setEditDialogTitle('Add Child');
      setEditDialogDescription('Add information about your child');
    }
    
    setEditDialogOpen(true);
  };
  
  const openDeleteKidDialog = (index: number) => {
    setDeletingKidIndex(index);
    setDeleteKidDialogOpen(true);
  };
  
  const handleDeleteKid = () => {
    if (deletingKidIndex === undefined) return;
    
    const success = removeKid(deletingKidIndex);
    
    if (success) {
      toast({
        title: "Child removed",
        description: "The child has been removed from your profile.",
      });
    } else {
      toast({
        title: "Removal failed",
        description: "There was a problem removing the child. Please try again.",
        variant: "destructive",
      });
    }
    
    setDeleteKidDialogOpen(false);
  };
  
  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };
  
  // Handle avatar click to open profile photo editing
  const handleAvatarClick = () => {
    openEditProfileDialog('photo');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto pt-24 pb-24 px-4">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <Avatar 
                  className="h-24 w-24 md:h-32 md:w-32 cursor-pointer relative group"
                  onClick={handleAvatarClick}
                >
                  {userInfo?.profilePictureURL ? (
                    <AvatarImage src={userInfo.profilePictureURL} alt={userInfo?.name || "User"} />
                  ) : (
                    <>
                      <AvatarImage src={userInfo?.profileImage} alt={userInfo?.name || "User"} />
                      <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                        {getInitials(userInfo?.name || '')}
                      </AvatarFallback>
                    </>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition-opacity">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                </Avatar>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => openEditProfileDialog('all')}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 font-playfair">
                  {userInfo?.name || 'Your Name'}
                </h1>
                
                <div className="flex flex-wrap gap-y-2 gap-x-4 text-muted-foreground mb-4">
                  {userInfo?.neighborhood && (
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      <span>{userInfo.neighborhood}</span>
                    </div>
                  )}
                  
                  {userInfo?.birthDate && (
                    <div className="flex items-center">
                      <Cake className="mr-1 h-4 w-4" />
                      <span>{formatDate(userInfo.birthDate)}</span>
                    </div>
                  )}
                  
                  {userInfo?.workStatus && (
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4" />
                      <span>{userInfo.workStatus}</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Heart className="mr-2 h-4 w-4 text-primary" />
                    Interests
                  </h3>
                  <p className="text-muted-foreground">
                    {userInfo?.interests || 'No interests specified yet. Add your interests to connect with like-minded moms!'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">About</TabsTrigger>
            <TabsTrigger value="kids">Kids</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl">About Me</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => openEditProfileDialog('personal')}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Bio
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Bio</h3>
                    <p className="text-muted-foreground">
                      {userInfo?.bio || 'No bio added yet. Tell other moms about yourself!'}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Nationality</h3>
                    <Button variant="ghost" size="sm" onClick={() => openEditProfileDialog('basic')}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground">
                    {userInfo?.nationality || 'Not specified'}
                  </p>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Contact Information</h3>
                    <Button variant="ghost" size="sm" onClick={() => openEditProfileDialog('contact')}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-muted-foreground">Email: </span>
                      <span>{userInfo?.email || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone: </span>
                      <span>{userInfo?.phone || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="kids" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl">My Kids</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openEditKidDialog()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Kid
                </Button>
              </CardHeader>
              <CardContent>
                {!userInfo?.kids || userInfo.kids.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No kids added yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Add information about your kids to find moms with children of similar ages.
                    </p>
                    <Button 
                      className="mt-4" 
                      variant="warm"
                      onClick={() => openEditKidDialog()}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Kid
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y">
                    {userInfo.kids.map((kid, index) => (
                      <div key={index} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">Child {index + 1}</h3>
                            <div className="text-muted-foreground mt-1">
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="h-4 w-4" />
                                <span>Birth date: {formatDate(kid.birthDate)}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <User className="h-4 w-4" />
                                <span>Gender: {kid.gender || 'Not specified'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => openEditKidDialog(index)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-destructive hover:text-destructive/80"
                              onClick={() => openDeleteKidDialog(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="connections" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">My Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Build your mom network</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Connect with other moms in your neighborhood to share experiences and support.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link to="/ally">Find Moms</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <EditProfileDialog
        isOpen={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        mode={editDialogMode}
        kidIndex={editingKidIndex}
        title={editDialogTitle}
        description={editDialogDescription}
        section={activeProfileSection}
      />
      
      <AlertDialog open={deleteKidDialogOpen} onOpenChange={setDeleteKidDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove this child from your profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteKid} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default Profile;
