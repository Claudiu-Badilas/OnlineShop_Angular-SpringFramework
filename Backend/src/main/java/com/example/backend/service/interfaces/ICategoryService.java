package com.example.backend.service.interfaces;

import com.example.backend.model.Category;

import java.util.List;

public interface ICategoryService {

    public List<Category> findAll();

    public Category save(Category Category);
}
