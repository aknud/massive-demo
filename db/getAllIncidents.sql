-- select * from incidents;
select i.id, i.us_state, inj.name as injury_name, aa.name as affected_area_name, c.name as causes_name, tth
from incidents i
join injuries inj on inj.id = i.injury_id
join affected_areas aa on aa.id = inj.affected_area_id
join causes c on c.id = i.cause_id
where tth = $1;