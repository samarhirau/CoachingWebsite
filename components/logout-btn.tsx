import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Correct App Router hook
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'; 
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth-provider';


const LogoutConfirmation = () => {
  // 1. ✅ CORRECT: All hook calls are INSIDE the function component
  const router = useRouter(); 
  const { logout } = useAuth(); 

  const [isOpen, setIsOpen] = useState(false);

  // 2. ✅ CORRECT: Function is properly defined and uses the destructured 'logout'
  const handleFinalLogout = async () => {
    try {
      await logout(); 
      router.push('/');
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsOpen(false); // Closes the dialog after the attempt
    }
  };

  return (
     <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You’ll be signed out from your account. You can log in again anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleFinalLogout}
          >
            Yes, Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  
  );
};

export default LogoutConfirmation;


