package com.mascova.chiron.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.mascova.chiron.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.mascova.chiron.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.Patient.class.getName(), jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.Patient.class.getName() + ".visits", jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.Doctor.class.getName(), jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.Staff.class.getName(), jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.Visit.class.getName(), jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.Service.class.getName(), jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.Receipt.class.getName(), jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.DrugCatalogue.class.getName(), jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.ReceiptService.class.getName(), jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.ReceiptDrug.class.getName(), jcacheConfiguration);
            cm.createCache(com.mascova.chiron.domain.DrugStock.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
