package com.example.backend.service.interfaces;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

import static java.util.concurrent.TimeUnit.MINUTES;

@Service
public interface ILoginAttemptService {

    public void evictUserFromLoginAttemptCache(String username);

    public void addUserToLoginAttemptCache(String username);

    public boolean hasExceededMaxAttempts(String username);

}
