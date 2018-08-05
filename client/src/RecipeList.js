import React, { Component } from 'react';
import 'whatwg-fetch';
import moment from 'moment';

import { Table } from './Table';

const columns = [
  {
    width: '20%',
    data: 'picture',
    name: ''
  },
  {
    width: '20%',
    data: 'name',
    name: 'Title'
  },
  {
    width: '20%',
    data: 'name',
    name: 'Total Time'
  },
  {
    width: '20%',
    data: 'name',
    name: 'Author'
  },
  {
    width: '20%',
    data: 'name',
    name: 'Date Created'
  }
];

class RecipeList extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    this.loadRecipesFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadRecipesFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadRecipesFromServer = () => {
    fetch('/api/recipes/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  render() {

    let tableProps = {
      fetchUrl: "/recipes/",
      columns: columns,
      dataKeys: ['image', 'title', 'time', 'author', 'createdAt'],
      data: this.state.data,
      fetchKey: '',
      cellClassName: 'text-truncate',
      customRender: {
        image: {
          renderer: (item, props) => {
            // TO-DO: display image
            return (
              <img className="img-circle" alt="" src="" />
            )
          },
          className: 'table-image'
        },
        title: {
          renderer: (item, props) => {
            return (
              <a href={ props.fetchUrl + item._id }>
                { item.title }
              </a>
            )
          }
        },
        createdAt: {
          renderer: (item, props) => {
            let offset = moment().utcOffset();
            return moment.utc(item.createdAt).utcOffset(offset).format('MMM D, YYYY');
          }
        }
      }
    };

    return (
      <div className="main-content">
        <div className="recipes">
          <h2>Recipes</h2>
          <Table { ...tableProps } />
        </div>
      </div>
    );
  }
};

export { RecipeList };