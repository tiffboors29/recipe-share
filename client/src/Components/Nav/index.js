import React from 'react';

const Nav = (props) => {
	const { nav, actionBtn } = props;

	function renderNav () {
		return nav.map((item, i) =>
			<li key={ i }><a href={ item.path }>{ item.name }</a></li>
		)
	}

	function renderActionBtn () {
		return (
			<ul className="nav navbar-nav navbar-right">
        <li>
        	<button className="signin-button login" onClick={ actionBtn.onClick }>
						{ actionBtn.text }
					</button>
        </li>
      </ul>
     )
	}

  return (
	  <nav className="navbar navbar-default">
	    <div className="container">
	      <div className="navbar-header">
	        <button  className="navbar-toggle"  type="button"  data-toggle="collapse"  data-target="#navbar-collapse">
	        	<span className="sr-only">Toggle navigation</span>
	        	<span className="icon-bar"></span>
	        	<span className="icon-bar"></span>
	        	<span className="icon-bar"></span>
	        </button>
	        <a href="/">
	        	<h1 className="brand-logo"></h1>
	        </a>
    		</div>

	      <div className="collapse navbar-collapse" id="navbar-collapse">
	        <ul className="nav navbar-nav navbar-left no-basic">
	        	{ renderNav() }
	        </ul>
	        { actionBtn ? renderActionBtn() : null }
	      </div>
	    </div>
	  </nav>
	);
};

export { Nav };