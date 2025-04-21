CREATE TABLE professor_equipe (
                              id_professor int NOT NULL,
                              id_equipe int NOT NULL,
                              PRIMARY KEY (id_professor,id_equipe),
                              KEY id_professor (id_professor),
                              CONSTRAINT equipe_p_fk1 FOREIGN KEY (id_equipe) REFERENCES equipe (id),
                              CONSTRAINT professor_fk2 FOREIGN KEY (id_professor) REFERENCES professor (id)
);

INSERT INTO professor_equipe (id_professor, id_equipe)
SELECT id, equipe_id FROM professor
WHERE equipe_id IS NOT NULL;

ALTER TABLE professor
DROP FOREIGN KEY professor_ibfk_1;

ALTER TABLE professor
DROP COLUMN equipe_id;