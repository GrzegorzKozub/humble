import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const FilterLink = ({ filter, children }) => (
  <NavLink
    exact
    to={`/${filter}`}
    activeStyle={{ textDecoration: 'none', color: 'black' }}
  >
    {children}
  </NavLink>
)

FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default FilterLink
