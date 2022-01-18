package com.example.backend.controller;

import com.example.backend.exception.ExceptionHandling;
import com.example.backend.model.Category;
import com.example.backend.service.implementation.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path={"/","api/category"})
public class CategoryController extends ExceptionHandling {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> findAllCategories() {
        return ResponseEntity.ok(categoryService.findAll());
    }


    @PostMapping("/save")
    public ResponseEntity<Category> saveOrder(@RequestBody Category category) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(categoryService.save(category));
    }
}
