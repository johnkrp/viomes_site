import { cn } from "@/lib/utils";
import { ImgHTMLAttributes, useState } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  blurDataUrl?: string;
  containerClassName?: string;
  showSkeleton?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  blurDataUrl,
  containerClassName,
  showSkeleton = true,
  className,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div
      className={cn("relative overflow-hidden bg-muted/30", containerClassName)}
    >
      {/* Blur-up placeholder */}
      {blurDataUrl && !isLoaded && (
        <img
          src={blurDataUrl}
          alt=""
          aria-hidden="true"
          className={cn(
            "absolute inset-0 h-full w-full object-cover blur-md",
            className,
          )}
          style={{ filter: "blur(20px)" }}
        />
      )}

      {/* Skeleton loader */}
      {showSkeleton && !isLoaded && (
        <div className="absolute inset-0 h-full w-full animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted" />
      )}

      {/* Main image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className,
        )}
        {...props}
      />

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <span className="text-xs text-muted-foreground">
            Image not available
          </span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
