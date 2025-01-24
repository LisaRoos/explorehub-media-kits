import { FeatureHighlights } from "./media-kit/FeatureHighlights";
import { PhoneMockup } from "./media-kit/PhoneMockup";
import { sampleContent } from "./media-kit/sampleContent";

export const MediaKitMockup = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Professional <span className="gradient-text">Media Kits</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcase your influence with beautiful, data-driven media kits
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="order-2 md:order-1">
            <PhoneMockup content={sampleContent} />
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <FeatureHighlights />
          </div>
        </div>
      </div>
    </section>
  );
};