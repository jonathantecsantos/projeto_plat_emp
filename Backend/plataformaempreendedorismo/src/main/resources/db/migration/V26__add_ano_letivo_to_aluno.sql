ALTER TABLE aluno ADD COLUMN ano_letivo INT;
UPDATE aluno SET ano_letivo = 2025 WHERE ano_letivo IS NULL;
