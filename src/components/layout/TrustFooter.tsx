export function TrustFooter({ synced }: { synced?: string }) {
  return (
    <div className="mt-6 pb-6 border-t border-gray-100 pt-4 space-y-2">
      {synced && (
        <p className="text-center text-[10px] text-gray-300">
          Data last synced: {synced}
        </p>
      )}
      <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
        <span className="flex items-center gap-1 text-[10px] text-gray-300">
          <span className="text-status-green text-[9px]">✓</span>
          SEBI Registered Investment Adviser · INA000012487
        </span>
        <span className="text-gray-200 text-[10px]">·</span>
        <span className="flex items-center gap-1 text-[10px] text-gray-300">
          <span className="text-status-green text-[9px]">✓</span>
          AMFI-Registered · ARN-189204
        </span>
        <span className="text-gray-200 text-[10px]">·</span>
        <span className="flex items-center gap-1 text-[10px] text-gray-300">
          <span className="text-status-green text-[9px]">✓</span>
          ISO 27001:2022 · 256-bit Encrypted
        </span>
      </div>
    </div>
  );
}
