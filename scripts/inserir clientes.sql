DO
$$
DECLARE   
    i INT;              
BEGIN
    FOR i IN 1..12000 LOOP       
        INSERT INTO clientes (codigo)
        VALUES (i);
    END LOOP;
END;
$$;
