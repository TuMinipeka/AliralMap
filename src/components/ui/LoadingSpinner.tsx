// Spinner de carga reutilizable con texto opcional
interface LoadingSpinnerProps {
  text?: string
}

export function LoadingSpinner({ text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-brand-slate border-t-brand-orange rounded-full animate-spin sm:w-10 sm:h-10" />
      {text && (
        <p className="text-sm text-gray-400 sm:text-base">{text}</p>
      )}
    </div>
  )
}
