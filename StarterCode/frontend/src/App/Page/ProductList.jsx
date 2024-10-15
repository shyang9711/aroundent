import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [productList, setProductList] = useState([]);

  //implement the get products function
  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products', {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setProductList(data);
    })
    .catch((error) => {
      console.error('Error : ', error);
    })
  };

  //implement the delete function
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(() => {
      const updatedProducts = productList.filter(product => product.id !== id);
      setProductList(updatedProducts);
      }
    )
    .catch((error) => {
      console.error('Error : ', error);
    })
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Grid container style={{spacing: 3}}>
        {productList.map((product) => (   
        <Grid item xs={4} key={product.id}>
            <Card style={{margin: 25}}>
              <IconButton aria-label="delete" onClick={() => handleDelete(product.id)} style={{justifyContent: 'start'}}>
                <DeleteIcon style={{color: 'red'}}/>
              </IconButton>
              <CardMedia 
                component = "img"
                image = {product.imageUrl}
              />
              <h1>{product.name}</h1>
              <h3>${product.price}</h3>
              <h4 style={{color: 'GrayText'}}>{product.description}</h4>
            </Card>
        </Grid>
        ))}
    </Grid>
      
    </Container>
  );
};

export default ProductList;