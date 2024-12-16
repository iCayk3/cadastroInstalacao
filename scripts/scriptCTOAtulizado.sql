	DO
	$$
	DECLARE
	    cto_id INT;   
	    i INT;        
	    j INT;        
	BEGIN
	    FOR i IN 1..200 LOOP       
	        INSERT INTO CTOS (nome_cto, olt_id)
	        VALUES ('CTO SJP ' || i, 1)
	        RETURNING id INTO cto_id;
	        FOR j IN 1..16 LOOP
	            INSERT INTO portas (cto_id, porta)
	            VALUES (cto_id, j);
	        END LOOP;
	    END LOOP;
	END;
	$$;