import type { Metadata } from "next";
import { PageScaffold } from "../components/PageScaffold";
import { WishlistClient } from "../components/WishlistClient";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Save skincare products to research or try later.",
};

export default function WishlistPage() {
  return (
    <PageScaffold
      title="Wishlist"
      description="Keep a short list of products you want to compare, research, or add to your routine later."
    >
      <WishlistClient />
    </PageScaffold>
  );
}
