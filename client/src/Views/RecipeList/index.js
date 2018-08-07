import React, { Component } from 'react';
import 'whatwg-fetch';
import moment from 'moment';

import { Table } from '../../Components/Table';

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
    this.state = {
      searchFilter: ''
    }
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
    fetch('/recipes/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.applyFilters(res.data);
      });
  }

  updateFilter = (e) => {
    let newState = { ...this.state };
    newState.searchFilter = e.target.value;
    this.setState(newState);

    this.applyFilters();
  }

  applyFilters = (data) => {
    data = data || this.state.data;

    if (this.state.searchFilter){
      let regex = new RegExp(this.state.searchFilter, 'i');
      data = data.filter(item => {
        return item.title.match(regex) || item.author.match(regex);
      });
    }
    this.setState({ data: data });
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
            if (item.image && item.image.data.data){
              let base64Data = new Buffer(item.image.data.data, 'binary').toString('base64');
              return (
                <div className="list-image-container">
                  <img className="" alt={ item.title } src={ `data:image/png;base64,${base64Data}` } />
                </div>
              )
            }
            return null;
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
      <div className="main">
        <div className="recipes">
          
          <div className="search-field">
            <div className="form-group">
              <label className="control-label">Search:</label>
              <div>
                <input
                  className="form-control"
                  type="text"
                  name="search"
                  placeholder="Search by name or author"
                  value={ this.state.searchFilter }
                  onChange={ this.updateFilter }
                />
              </div>
            </div>
          </div>

          <Table { ...tableProps } />
        </div>
      </div>
    );
  }
};

export { RecipeList };