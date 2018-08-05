import React from 'react';

const Footer = (props) => {
  return (
  	<footer className="sc-footer" role="contentinfo">
	  	{ props.children }
		</footer>
  )
}

export { Footer };