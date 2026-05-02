import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-white/10 text-white',
        outline: 'border border-white/20 bg-transparent hover:bg-white/10',
        glass: 'liquid-glass text-white',
        glassStrong: 'liquid-glass-strong text-white',
        white: 'bg-white text-black hover:bg-white/90',
      },
      size: {
        default: 'h-10 px-5 py-2.5',
        sm: 'h-9 px-4',
        lg: 'h-12 px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

