import React from "react"

const ProductList = ({products, onView}) => 
products.sort((a,b) => b.id - a.id)
.map(product => {
  // Handle placeholder images
  const imageUrl = product.image.startsWith('QmPlaceholder') 
    ? 'https://via.placeholder.com/90x90/4CAF50/FFFFFF?text=Product'
    : `https://ipfs.infura.io/ipfs/${product.image}`;
  
  // Format date properly
  const formatDate = (dateString) => {
    try {
      if (!dateString || dateString === 'Invalid Date') {
        return new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
      // If it's already formatted, return as is
      if (dateString.includes('/') || dateString.includes('-')) {
        return dateString;
      }
      // If it's an ISO string, format it
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };
    
  return (
    <tr key={product.id}>
        {/* <td className="p-img">{product.id.toString()}</td> */}
        <td className="p-img"><img style={{width: "90px", height: "90px", cursor: "pointer"}} 
          src={imageUrl} alt="Product" 
          onClick={() => onView(product.image)}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/90x90/4CAF50/FFFFFF?text=Product';
          }}/></td>
        <td className="p-name">{product.name}</td>
        <td className="p-comp">{(product.process).replace(/^\[(.+)\]$/,'$1').replace(/"/g, ' ')}</td>
        <td className="p-comp">{formatDate(product.date)}</td>
    </tr>
  )
})

const Product = ({ products, onView }) => {

    return (
      <>
        <table className="table">
          <tr>
            <th className='product-img'></th>
            <th className='product-name'>Product Name</th>
            <th className='process'>Product Production Processes</th>
            <th>Date Time Added</th>
          </tr>
          <ProductList onView={onView} products={products} />
      </table>
    </>

    )
}

export default Product

