--PBATCH CALC--
Simple chrome extension to automate collection of Minimum Flight Time, static thrust (g) , T/W, Pitch Spd, Est Lvl Spd, Eff Drive, Power, Min Flight Time all in imperial units, from ecalc/Propcalc site
for varying diameter and pitch combinations.

Diameter From : Enter diameter lower bound
Diameter to: Enter diamter upper bound

Pitch From: Enter pitch lower bound
Pitch to: Enter pitch lower bound

After entering  above values, hit run batch to run calculations. Ensure that all other values/configurations are loaded directly onto the propcalc website fields. NAN values will be recorded as blank spaces.
AFTER run batch completes data collection, hit "Export to .csv" button to download tabulated values as a csv file.

In order to keep either pitch or diameter constant while only varying the other, enter the value you wish to keep constant in both the "From" and "to" boxes, and enter interval as 1.
This will run the loop once over that constant value for each of the varying values.
DO NOT ENTER ZERO IN THE INTERAL FIELD, THIS WILL RESULT IN A PERMANENT LOOP. Foolproofing will be added later.
