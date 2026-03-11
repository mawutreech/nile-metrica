type FlashBannerProps = {
  kind: "success" | "error";
  message: string;
};

export function FlashBanner({ kind, message }: FlashBannerProps) {
  const styles =
    kind === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-rose-200 bg-rose-50 text-rose-800";

  return (
    <div className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${styles}`}>
      {message}
    </div>
  );
}