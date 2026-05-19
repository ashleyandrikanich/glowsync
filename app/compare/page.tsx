import type { Metadata } from "next";
import { PageScaffold } from "../components/PageScaffold";
import { ProductCompareClient } from "../components/ProductCompareClient";

export const metadata: Metadata = {
  title: "Product Compare",
  description: "Compare skincare products by actives, ingredients, and role.",
};

export default function ProductComparePage() {
  return (
    <PageScaffold
      title="Product Compare"
      description="Place products side by side so it is easier to choose what fits your routine."
    >
      <ProductCompareClient />
    </PageScaffold>
  );
}
