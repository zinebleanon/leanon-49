
import { Activity, Heart, Baby, School, Film, ListCheck } from 'lucide-react';
import { ReactNode } from 'react';

export interface SubCategory {
  name: string;
}

export interface Category {
  name: string;
  color: string;
  icon: ReactNode;
  subcategories: SubCategory[];
}

export const contentCategories: Category[] = [
  {
    name: "Health Care & Professional support",
    color: "#FFE6D9", // Peach
    icon: <Activity className="h-5 w-5 text-rose-400" />,
    subcategories: [
      { name: "Doctors/Therapist" },
      { name: "Hospitals/Clinics" },
      { name: "Doulas" },
      { name: "Lactation/Feeding" },
      { name: "Sleep" },
    ]
  },
  {
    name: "Emotional, Mental & Physical wellbeing",
    color: "#D9F4FF", // Light Blue
    icon: <Heart className="h-5 w-5 text-blue-400" />,
    subcategories: [
      { name: "Postpartum" },
      { name: "Workout" },
      { name: "Mental Health" },
      { name: "Healing" },
    ]
  },
  {
    name: "Parenting Guidance",
    color: "#F9D9FF", // Light Pink
    icon: <Baby className="h-5 w-5 text-pink-400" />,
    subcategories: [
      { name: "Behavior/Education" },
      { name: "Transitions" },
      { name: "Emotional & Social development" },
      { name: "Communication" },
    ]
  },
  {
    name: "Childcare & Schooling",
    color: "#FFFF8F", // Yellow
    icon: <School className="h-5 w-5 text-yellow-400" />,
    subcategories: [
      { name: "Nannies" },
      { name: "Nursery" },
      { name: "School" },
      { name: "Tutoring" },
      { name: "Transitions" },
    ]
  },
  {
    name: "Kids Entertainment",
    color: "#FFD700", // Gold yellow
    icon: <Film className="h-5 w-5 text-amber-400" />,
    subcategories: [
      { name: "Kids Developments" },
      { name: "Birthdays" },
      { name: "Activities" },
      { name: "Camps" },
    ]
  },
  {
    name: "Kids Essentials Checklist",
    color: "#FDE1D3", // Soft Peach
    icon: <ListCheck className="h-5 w-5 text-green-400" />,
    subcategories: [
      { name: "Newborn Essentials" },
      { name: "Toddler Must-Haves" },
      { name: "School Supplies" },
      { name: "Travel Items" },
      { name: "Recommended Brands" },
    ]
  }
];
