import BookingLink from "@/components/BookingLink/BookingLink";
import { NaverBookingIcon } from "@/components/Icons";
import styles from "./NaverBookingFloat.module.css";

export default function NaverBookingFloat() {
  return (
    <BookingLink className={styles.float} aria-label="네이버 예약">
      <NaverBookingIcon className={styles.icon} />
    </BookingLink>
  );
}