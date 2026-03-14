'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface TypingEffectProps {
  texts?: string[]
  className?: string
  rotationInterval?: number
  typingSpeed?: number
}

const DEMO = ['Design', 'Development', 'Marketing']

export const TypingEffect = ({
  texts = DEMO,
  className,
  rotationInterval = 3000,
  typingSpeed = 150,
}: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const currentText = texts[currentTextIndex % texts.length]

  // Only run effect when component is mounted
  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (charIndex < currentText.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText.charAt(charIndex))
        setCharIndex(charIndex + 1)
      }, typingSpeed)
    } else {
      // Wait before rotating to next text
      timeoutRef.current = setTimeout(() => {
        setDisplayedText('')
        setCharIndex(0)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      }, rotationInterval)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [charIndex, currentText, isMounted, typingSpeed, rotationInterval, texts])

  if (!isMounted) {
    return <span className={className}>{texts[0]}</span>
  }

  return (
    <span className={cn('relative inline', className)}>
      {displayedText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="ml-1 h-[1em] w-1 rounded-sm bg-current inline-block"
      />
    </span>
  )
}

export default TypingEffect
