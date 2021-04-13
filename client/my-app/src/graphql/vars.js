import { makeVar } from '@apollo/client'

export const favoritesVar = makeVar([])

// favoritesVar adalah sebuah function
// read --> favoritesVar()
// set --> favoritesVar(newValue)