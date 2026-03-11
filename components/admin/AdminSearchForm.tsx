type AdminSearchFormProps = {
  placeholder: string;
  defaultValue?: string;
};

export function AdminSearchForm({
  placeholder,
  defaultValue = "",
}: AdminSearchFormProps) {
  return (
    <form method="GET" className="mt-6 flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Search
        </button>
        <a
          href="."
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Clear
        </a>
      </div>
    </form>
  );
}