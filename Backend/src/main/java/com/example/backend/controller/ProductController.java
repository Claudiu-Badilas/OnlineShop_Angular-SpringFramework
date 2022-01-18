package com.example.backend.controller;

import com.example.backend.exception.ExceptionHandling;
import com.example.backend.exception.model.ProductNotFoundException;
import com.example.backend.model.Product;
import com.example.backend.service.implementation.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@Controller
@RequestMapping(path={"/","api/product"})
public class ProductController extends ExceptionHandling {
    @Autowired
    private ProductService productService;


    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts() {
        List<Product> products = productService.getProducts();
        return new ResponseEntity<>(products, OK);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<Product>> getProductsById(@PathVariable Long id) throws ProductNotFoundException {
        List<Product> products = productService.getProductsById(id);
        return new ResponseEntity<>(products,OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findProductById(id)
                .orElseThrow(() -> new RuntimeException("Product not found!")));
    }

    @PostMapping("/save")
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(productService.saveProduct(product));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateEmployee(@PathVariable(value = "id") Long id,
                                                  @Valid @RequestBody Product productDetails) throws RuntimeException {
        Product product = productService.findProductById(id)
                .orElseThrow(() -> new RuntimeException("Product not found for this id :: " + id));

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setImage(productDetails.getImage());
        product.setCategory(productDetails.getCategory());
        final Product updatedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable Long id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
