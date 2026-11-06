const base = "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-btn px-5 text-base font-semibold lg:min-h-11 lg:text-[15px]";

const variants = {
  primary: "bg-accent text-surface hover:bg-accent-hover",
  secondary: "border border-line-strong bg-surface text-ink hover:border-ink",
};

export type ButtonVariant = keyof typeof variants;

export function buttonClass(variant: ButtonVariant = "primary") {
    return `${base} ${variants[variant]}`;
}