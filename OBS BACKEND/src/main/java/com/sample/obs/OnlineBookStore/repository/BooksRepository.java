package com.sample.obs.OnlineBookStore.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sample.obs.OnlineBookStore.entity.Books;


@Repository
public interface BooksRepository extends JpaRepository<Books, Long> {
//	public List<Books> findAllByStoreId(long id);
	public List<Books> findAllByCategory(String category);
	public List<Books> findAllByAuthor(String author);
	public List<Books> findAllByTitleContaining(String title);
	
	public Books findTopByOrderByBookIdDesc();
	
	@Query("SELECT b FROM Books b WHERE b.availability=1")
	public List<Books> findByAvailability();
	
//	@Query(value = "SELECT * FROM BOOKS WHERE AVAILABILITY = TRUE", nativeQuery=true)
//	public List<Books> findByAvailability();
	
	
	@Transactional
	@Modifying
	@Query("UPDATE Books SET price = :price WHERE bookid = :id")
	public int updatePrice(@Param("price") double price, @Param("id") long id);
	
//	@Modifying
//	@Query(value = "UPDATE BOOKS SET PRICE = :price WHERE BOOKID = :id", nativeQuery=true)
//	public int updatePrice(@Param("price") double price, @Param("id") long id);

	
	@Transactional
	@Modifying
	@Query("UPDATE Books SET no_copies = :copies WHERE bookid = :id")
	public int updateNoCopies(@Param("copies") int copies, @Param("id") long id);
	
//	@Modifying
//	@Query(value = "UPDATE BOOKS SET NO_COPIES = :copies WHERE BOOKID = :id", nativeQuery=true)
//	public int updateNoCopies(@Param("copies") int copies, @Param("id") long id);
	
	
	@Transactional
	@Modifying
	@Query("UPDATE Books SET availability = :availability WHERE bookid = :id")
	public int updateAvailability(@Param("availability") boolean availability, @Param("id") long id);
	
//	@Modifying
//	@Query(value = "UPDATE BOOKS SET AVAILABILITY = :availability WHERE BOOKID = :id", nativeQuery=true)
//	public int updateAvailability(@Param("availability") boolean availability, @Param("id") long id);
	
	
	@Modifying
	@Query(value = "DELETE FROM BOOKS WHERE BOOKID = :id", nativeQuery=true)
	public int deleteBookById(@Param("id") long id);
}
