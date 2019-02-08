import React, { Component } from 'react';

const ITEMS_URL = 'http://192.168.1.48:4567/items.json'

class List extends Component {
  state = {
    items: [],
    loading: true,
    todoItem: '',
  }

  componentDidMount() {
    fetch(ITEMS_URL)
    .then(response => response.json())
    .then(items => {
      this.setState({ items, loading: false })
    })
  }

  addItem = (e) => {
    e.preventDefault()

    fetch(ITEMS_URL, {
      method: 'POST',
      body: JSON.stringify({ item: this.state.todoItem }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(items => {
      if (items.error) {
        alert(items.error)
      } else {
        this.setState({ items })
      }
    })

    this.setState({ todoItem: '' })
  }

  deleteItem = (itemId) => {
    fetch(ITEMS_URL, {
      method: 'DELETE',
      body: JSON.stringify({ id: itemId }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(items => {
      if (items.error) {
        alert(items.error)
      } else {
        this.setState({ items })
      }
    })
  }

  render() {
    return (
      <div className="List">
        <div className="px-3 py-2">
          <form className="form-inline my-3" onSubmit={this.addItem}>
            <div className="form-group mb-2 p-0 pr-3 col-8 col-sm-10">
              <input 
                className="form-control col-12"
                placeholder="What do you need to do?"
                value={this.state.todoItem}
                onChange={e => this.setState({ 
                  todoItem: e.target.value 
                })}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary mb-2 col-4 col-sm-2">
              Add
            </button>
          </form>

          { this.props.loading && <p>Loading...</p> }

          { 
            !this.props.loading && this.state.items.length === 0 && 
            <div className="alert alert-secondary">
              No items - all done!
            </div>
          }

          {
            !this.props.loading && this.state.items && 
            <table className="table table-striped">
              <tbody>
                {
                  this.state.items.map((item, i) => {
                    return (
                      <tr key={item.id} className="row">
                        <td className="col-1">{i+1}</td>
                        <td className="col-10">{item.item}</td>
                        <td className="col-1">
                          <button 
                            type="button" 
                            className="close" 
                            aria-label="Close"
                            onClick={() => this.deleteItem(item.id)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          }

        </div>
      </div>
    )
  }
}

export default List