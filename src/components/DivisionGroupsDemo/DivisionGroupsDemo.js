'use client'
import React, { useId } from 'react'
import clsx from 'clsx'

import { range } from '@/utils'
import Card from '@/components/Card'
import SliderControl from '@/components/SliderControl'

import Equation from './Equation'
import styles from './DivisionGroupsDemo.module.css'
import { LayoutGroup, motion } from 'framer-motion'


function DivisionGroupsDemo({
                              numOfItems = 12,
                              initialNumOfGroups = 1,
                              includeRemainderArea,
                            }) {
  const [numOfGroups, setNumOfGroups] = React.useState(
    initialNumOfGroups
  )

  const numOfItemsPerGroup = Math.floor(
    numOfItems / numOfGroups
  )
  const id = useId()

  const items = range(0, numOfItems).map((index) => ({
    id: id + '-' + index,
  }))

  const groups = range(0, numOfGroups).map((index) => ({
    id: id + '-' + index,
    items: items.slice(
      index * numOfItemsPerGroup,
      (index + 1) * numOfItemsPerGroup
    ),
  }))

  const remainderItems = items.slice(
    numOfItemsPerGroup * numOfGroups,
    numOfItems
  )

  const remainder = includeRemainderArea
    ? numOfItems % numOfGroups
    : null


  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    numOfGroups < 4
      ? {
        gridTemplateColumns: `repeat(${ numOfGroups }, 1fr)`,
      }
      : {
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
      }

  return (
    <LayoutGroup>
      <Card as="section" className={ styles.wrapper }>
        <header className={ styles.header }>
          <SliderControl
            label="Number of Groups"
            className={ styles.slider }
            step={ 1 }
            min={ 1 }
            max={ 4 }
            value={ numOfGroups }
            onChange={ (ev) =>
              setNumOfGroups(Number(ev.target.value))
            }
          />
        </header>

        <div className={ styles.demoWrapper }>
          <div
            className={ clsx(styles.demoArea) }
            style={ gridStructure }
          >
            { groups.map((group) => (
              <motion.div key={ group.id } className={ styles.group }>
                { group.items.map((item) =>
                  (
                    <motion.div
                      layoutId={ item.id }
                      key={ item.id }
                      className={ styles.item }
                    />
                  ))
                }
              </motion.div>
            )) }
          </div>
        </div>

        { includeRemainderArea && (
          <div className={ styles.remainderArea }>
            <p className={ styles.remainderHeading }>
              Remainder Area
            </p>

            { remainderItems.reverse().map((item) => {
              return (
                <motion.div layoutId={ item.id } key={ item.id } className={ styles.item }/>
              )
            }) }
          </div>
        ) }

        <Equation
          dividend={ numOfItems }
          divisor={ numOfGroups }
          remainder={ remainder }
        />
      </Card>
    </LayoutGroup>
  )
}

export default DivisionGroupsDemo
