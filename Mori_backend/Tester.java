import java.util.*;

public class Tester
{
    //Each of these maps is feature, with possibilities as keys and log odds ratio
    //as values TODO: make a seperate class for these features
    private Map<String, Double> gender = new TreeMap<String, Double>();
    private Map<String, Double> race = new TreeMap<String, Double>();
    
    private ArrayList<particularFeat> bobsFeatures;
    private ArrayList<particularFeat> kimsFeatures;
    
    
    private ArrayList<Person> ppl = new ArrayList<Person>();
    
    Tester()
    {
        gender.put( "male", 0.01 );
        gender.put( "female", -0.01);
        
        race.put( "black", 0.1 );        
        race.put( "white", -0.002);
        race.put( "asian", 0.02);
        
        particularFeat[] bobFArray = {
            new particularFeat(gender, "male"),
            new particularFeat(race, "black")
        };
        
        particularFeat[] kimFArray = {
            new particularFeat(gender, "female"),
            new particularFeat(race, "white")
        };
        
        bobsFeatures = new ArrayList<particularFeat>(Arrays.asList( bobFArray ));
        kimsFeatures = new ArrayList<particularFeat>(Arrays.asList( kimFArray ));

        Person Bob = new Person("Bob", bobsFeatures);
        Person Kim = new Person("Kim", kimsFeatures);
        
        ppl.add( Bob );
        ppl.add( Kim );
    }
    
    public ArrayList<Person> getPeople()
    {
        return ppl;
    }
    
    public static void main( String[] args )
    {
        Tester t = new Tester();
        for (Person p : t.getPeople())
        {
            System.out.println(p.name + " " + p.totalLogOdds());
        }

    }

}
