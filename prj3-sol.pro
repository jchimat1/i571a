%-*- mode: prolog; -*-
% An employee is represented using the structure
% employee(Name, Age, Department, Salary).
% List of employees used for testing
employees([ employee(tom, 33, cs, 85000.00),
            employee(joan, 23, ece, 110000.00),
            employee(bill, 29, cs, 69500.00),
            employee(john, 28, me, 58200.00),
            employee(sue, 19, cs, 22000.00)
          ]).
%%% #1 10-points
% dept_employees(Employees, Dept, DeptEmployees): Given a list
% Employees of employees and a department Dept match DeptEmployees
% to the subsequence of Employees having department Dept.

dept_employees([],_,[]).
dept_employees([H|T],Department,R) :-
 H = employee(_,_,Department,_),
 !,
 dept_employees(T,Department,R1),
 R = [H|R1].
dept_employees([_|T],Department,R) :-
 dept_employees(T,Department,R).
dept_employees(_,Department,[]) :-
 \+ memberchk(Department,[cs,ece,me]).
dept_employees(Department ,([H| _]), ([])):- dept_employees(Department , H, ([])).





%%% #2 15-points
% employees_salary_sum(Employees, Sum): succeeds iff Sum matches sum
% of salaries of the employees in Employees.  Must be tail-recursive.

employees_add_salary_sum([Head|Tail], sal_total, Sum):-
Head = employee(_,_,_,Salary),
total_sum is sal_total + Salary,
employees_add_salary_sum(Tail, total_sum, Sum).

employees_add_salary_sum([], Sum, Sum).

employees_salary_sum(Employees,Sum) :-
employees_add_salary_sum(Employees, 0, Sum).





%%% #4 15-points
% count_non_pairs(List, NNonPairs): NNonPairs matches the # of non-pairs
% in list List, including the non-pairs in any lists nested directly or
% indirectly in List.  Note that lists which are nested within a structure
% are not processed.
% The count will be the number of leaves in the tree corresponding to the
% list structure of List.

count_non_pairs([H|T],non_pair_count) :-
    count_non_pairs(H, H_count),
    count_non_pairs(T, T_count),
    !,
    non_pair_count is H_count + T_count.
count_non_pairs([], 1):-!.
count_non_pairs(_, 1):-!.





%%% #5 10-points
% divisible_by(Ints, N, Int): Int is an integer in list of integers Ints
% which is divisible by N.  Successive Int's are returned on backtracking
% in the order they occur within list Ints.
% Hint: use member/2 and the mod operator.

division(A, B) :-
    B mod A =:= 0.
divisible_by(A, B, listintger):-
include(division(B), A, listintger),
length(listintger, Length),
    (   Length == 0
    ->  false
    ;   true
    ).

