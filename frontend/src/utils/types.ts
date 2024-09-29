// src/types/types.ts

export type GolfCourse = {
  course_name: string;
  holes: number;
  par: number;
  course_type: string;
  course_architect: string;
  open_date: string | null;
  guest_policy: string;
  weekday_price: string;
  weekend_price: string;
  twilight_price: string;
  fairway: string;
  green: string;
  currency: string;
};

export type GolfClub = {
  club_name: string;
  club_membership: string;
  number_of_holes: number;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  fax: string;
  website: string;
  email_address: string;
  driving_range: boolean;
  putting_green: boolean;
  chipping_green: boolean;
  practice_bunker: boolean;
  motor_cart: boolean;
  pull_cart: boolean;
  golf_clubs_rental: boolean;
  club_fitting: boolean;
  pro_shop: boolean;
  golf_lessons: boolean;
  caddie_hire: boolean;
  restaurant: boolean;
  reception_hall: boolean;
  changing_room: boolean;
  lockers: boolean;
  lodging_on_site: boolean;
  latitude: number;
  longitude: number;
  place_id: string;
  golf_courses: GolfCourse[];
};

export type CourseDetailsResult = {
  formatted_address: string;
  formatted_phone_number: string;
  name: string;
  opening_hours: {
    open_now: boolean;
    periods: Array<{
      close: { day: number; time: string };
      open: { day: number; time: string };
    }>;
    weekday_text: string[];
  };
  photos: Array<{
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }>;
  rating: number;
  url: string;
  website: string;
};

export type CourseDetails = {
  course_details: {
    html_attributions: string[];
    result: CourseDetailsResult;
    status: string;
    error_message?: string;
  };
};

export type DetailedGolfClub = GolfClub & {
  course_details?: CourseDetailsResult;
};

export type GolfSearchResponse = {
  data: GolfType[]
  pagination: {
    total: number;
    page: number;
    pages: number;
  }
}