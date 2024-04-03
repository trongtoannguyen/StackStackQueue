package com.springboot.app.repository;

import com.springboot.app.accounts.entity.User;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Tuple;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
import java.util.TreeMap;

@Repository
public class UserDAO {
	private static final Logger logger = LoggerFactory.getLogger(UserDAO.class);

	@PersistenceContext
	protected EntityManager entityManager;


	private BiMap<String,String> username2EmailMap;
	@PostConstruct
	private void postConstruct() {
		buildCache();
		logger.info("UserDAO initialized");
	}
	
	/**
	 * search usernames using wildcard search
	 * @param userStr
	 * @return
	 */
	public List<String> searchUsernames(String userStr) {

		String queryStr = "SELECT usr.username FROM User usr WHERE usr.username LIKE :userStr";
		TypedQuery<String> query = entityManager.createQuery(queryStr, String.class);
		query.setParameter("userStr", userStr);
		return query.getResultList();
	}
	
	public void buildCache() {
		username2EmailMap = new BiMap<String, String>();
		// get all usernames and emails
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Tuple> cq = cb.createTupleQuery();
		Root<User> root = cq.from(User.class);

		username2EmailMap = new BiMap<String, String>();

		cq.multiselect(root.get("username"), root.get("person").get("email"));

		TypedQuery<Tuple> query = entityManager.createQuery(cq);
		List<Tuple> results = query.getResultList();
		for(Tuple result : results) {
			username2EmailMap.put(result.get(0, String.class), result.get(1, String.class));
		}
	}

	public boolean isUsernameExists(String username) {
		return username2EmailMap.containsKey(username);
	}

	public boolean isEmailExists(String email) {
		return username2EmailMap.containsValue(email);
	}

	public String getEmailForUsername(String username) {
		return username2EmailMap.get(username);
	}

	public String getUsernameForEmail(String email) {
		return username2EmailMap.getKey(email);
	}

	public void createUser(User user) {
		entityManager.persist(user);
		username2EmailMap.put(user.getUsername(), user.getPerson().getEmail());
	}

	public void deleteUser(User user) {
		User userToDelete = entityManager.merge(user);
		entityManager.remove(userToDelete);
		username2EmailMap.remove(userToDelete.getUsername());
	}

	public void updateUserPersonInfo(User user) {
		entityManager.merge(user.getPerson());
		// remove the old entry, then add the new one
		username2EmailMap.remove(user.getUsername());
		username2EmailMap.put(user.getUsername(), user.getPerson().getEmail());
	}

	public Set<String> getAllUsernames() {
		return username2EmailMap.keySet();
	}

	public Set<String> getAllEmails() {
		return username2EmailMap.valueSet();
	}


	/**
	 *
	 * A simple bi-directional map used to store username/email pair
	 *
	 * Modified from (original) code: https://stackoverflow.com/questions/9783020/bidirectional-map
	 *
	 * @param <K>
	 * @param <V>
	 */
	public class BiMap<K,V> {

		// Note: use TreeMap instead of HashMap to have the key ordered
		TreeMap<K, V> map = new TreeMap<K, V>();
		TreeMap<V, K> inversedMap = new TreeMap<V, K>();

		void put(K k, V v) {
			map.put(k, v);
			inversedMap.put(v, k);
		}

		public void remove(K k) {

			V v = map.remove(k);
			if(v != null) inversedMap.remove(v);
		}

		V get(K k) {
			return map.get(k);
		}

		K getKey(V v) {
			return inversedMap.get(v);
		}

		boolean containsKey(K k) {
			return map.containsKey(k);
		}

		boolean containsValue(V v) {
			return inversedMap.containsKey(v);
		}

		Set<K> keySet() {
			return map.keySet();
		}

		Set<V> valueSet() {
			return inversedMap.keySet();
		}
	}
}
