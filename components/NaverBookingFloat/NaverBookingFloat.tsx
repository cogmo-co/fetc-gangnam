import BookingLink from "@/components/BookingLink/BookingLink";
import { NaverBookingIcon } from "@/components/Icons";
import { useTranslations } from "next-intl";
import styles from "./NaverBookingFloat.module.css";

export default function NaverBookingFloat() {
  const t = useTranslations("A11y");
  return (
    <BookingLink className={styles.float} aria-label={t("naverBooking")}>
      <NaverBookingIcon className={styles.icon} />
    </BookingLink>
  );
}