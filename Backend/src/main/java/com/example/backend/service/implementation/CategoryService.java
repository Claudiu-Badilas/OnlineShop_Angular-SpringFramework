package com.example.backend.service.implementation;

import com.example.backend.model.Category;
import com.example.backend.model.Order;

import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category save(Category Category) {
        return categoryRepository.save(Category);
    }


}
