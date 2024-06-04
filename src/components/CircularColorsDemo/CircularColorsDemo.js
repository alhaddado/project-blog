"use client"

import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather'

import Card from '@/components/Card'
import VisuallyHidden from '@/components/VisuallyHidden'

import styles from './CircularColorsDemo.module.css'
import { motion } from 'framer-motion'

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
]

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timerId, setTimerId] = useState(-1)

  // TODO: This value should increase by 1 every second:
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1)
      }, 1000)

      setTimerId(timer)

      return () => {
        clearInterval(timer)
      }
    } else {
      clearInterval(timerId)
    }

  }, [isPlaying])

  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length]

  return (
    <Card as="section" className={ styles.wrapper }>
      <ul className={ styles.colorsWrapper }>
        { COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value

          return (
            <li
              className={ styles.color }
              key={ index }
            >
              { isSelected && (
                <motion.div
                  layoutId="selectedColorOutline"
                  className={
                    styles.selectedColorOutline
                  }
                />
              ) }
              <div
                className={ clsx(
                  styles.colorBox,
                  isSelected &&
                  styles.selectedColorBox
                ) }
                style={ {
                  backgroundColor: color.value,
                } }
              >
                <VisuallyHidden>
                  { color.label }
                </VisuallyHidden>
              </div>
            </li>
          )
        }) }
      </ul>

      <div className={ styles.timeWrapper }>
        <dl className={ styles.timeDisplay }>
          <dt>Time Elapsed</dt>
          <dd>{ timeElapsed }</dd>
        </dl>
        <div className={ styles.actions }>
          <button onClick={ () => setIsPlaying(!isPlaying) }>
            { isPlaying ? <Pause/> : <Play/>}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button onClick={ () => {
            setIsPlaying(false)
            setTimeElapsed(0)
          } }>
            <RotateCcw/>
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  )
}

export default CircularColorsDemo
