import React from 'react';

const Header = (props) => {
	const { title, nav, actionBtn } = props;

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
		<header className="site-header">
		  <nav className="navbar navbar-default">
		    <div className="container">
		      <div className="navbar-header">
		        <button  className="navbar-toggle"  type="button"  data-toggle="collapse"  data-target="#navbar-collapse">
		        	<span className="sr-only">Toggle navigation</span>
		        	<span className="icon-bar"></span>
		        	<span className="icon-bar"></span>
		        	<span className="icon-bar"></span>
		        </button>
		        <h1 className="brand-logo">
		        	<a href="/"><span>{ title }</span></a>
		        </h1>
      		</div>

		      <div className="collapse navbar-collapse" id="navbar-collapse">
		        <ul className="nav navbar-nav navbar-left no-basic">
		        	{ renderNav() }
		        </ul>
		        { actionBtn ? renderActionBtn() : null }
		      </div>
		    </div>
		  </nav>
		</header>

	);
};

export { Header };