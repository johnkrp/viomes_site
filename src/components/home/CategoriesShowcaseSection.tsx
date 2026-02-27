import { useState } from "react";
import { Link } from "react-router-dom";

import { productCategories } from "./homeData";

const CategoriesShowcaseSection = () => {
  const [categoryPreviewIndex, setCategoryPreviewIndex] = useState(0);

  return (
    <section className="mt-14 bg-background sm:mt-16 lg:mt-20" id="categories">
      <div className="w-full overflow-hidden bg-accent text-accent-foreground">
        <div className="border-b border-accent-foreground/35 px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <h2 className="font-heading text-3xl font-medium leading-none sm:text-4xl lg:text-6xl">
            Κατηγορίες
          </h2>
          <p className="mt-6 text-base text-accent-foreground/90 sm:text-xl">
            Βρείτε ό,τι χρειάζεστε για το σπίτι και τον επαγγελματικό σας χώρο
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
          <div className="divide-y divide-accent-foreground/35">
            {productCategories.map((cat, i) => (
              <Link
                key={`template-category-${i}`}
                to={cat.href}
                onMouseEnter={() => setCategoryPreviewIndex(i)}
                onFocus={() => setCategoryPreviewIndex(i)}
                className={`flex items-center justify-between px-6 py-10 text-2xl transition sm:px-10 sm:py-12 sm:text-3xl lg:px-14 lg:py-16 lg:text-4xl ${
                  categoryPreviewIndex === i ? "bg-accent-foreground/10" : ""
                }`}
              >
                <span className="inline-flex items-center font-heading font-normal">
                  <span
                    aria-hidden="true"
                    className={`inline-flex items-center justify-center overflow-hidden text-3xl leading-none transition-all duration-300 ${
                      categoryPreviewIndex === i ? "mr-4 w-10 opacity-100" : "mr-0 w-0 opacity-0"
                    }`}
                  >
                    {cat.hoverEmoji}
                  </span>
                  <span>{cat.title}</span>
                </span>
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-20 w-28 object-cover lg:hidden"
                />
              </Link>
            ))}
          </div>

          <div className="relative hidden overflow-hidden border-l border-accent-foreground/35 lg:block">
            <img
              key={`category-preview-${categoryPreviewIndex}`}
              src={productCategories[categoryPreviewIndex].image}
              alt={productCategories[categoryPreviewIndex].title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcaseSection;
