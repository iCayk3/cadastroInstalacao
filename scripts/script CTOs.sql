DO
$$
DECLARE
    cto_id INT;   -- Variável para armazenar o ID da CTO recém-inserida
    i INT;        -- Variável para o loop externo (número de CTOs)
    j INT;        -- Variável para o loop interno (número de portas)
BEGIN
    -- Loop para adicionar 200 CTOs
    FOR i IN 1..200 LOOP
        -- Inserir uma nova CTO
        INSERT INTO CTOS (nome_cto, olt_id)
        VALUES ('CTO ' || i, 1)
        RETURNING id INTO cto_id;  -- Armazena o ID da nova CTO em cto_id

        -- Loop para adicionar 16 portas para cada CTO
        FOR j IN 1..16 LOOP
            INSERT INTO portas (cto_id, porta)
            VALUES (cto_id, j);
        END LOOP;
    END LOOP;
END;
$$;