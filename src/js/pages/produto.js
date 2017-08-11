function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

const productId = getURLParameter('product');
const productSeg = getURLParameter('segmentation');


console.log(productId, productSeg)
