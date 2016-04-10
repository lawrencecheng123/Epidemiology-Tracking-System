import java.util.ArrayList;

public class Person
{
    String name;
    ArrayList<particularFeat> features;
    
    Person(String name, ArrayList<particularFeat> features) 
    {
        this.name = name;
        this.features = features;
    }
    
    public double totalLogOdds()
    {
        double total = 0;
        for (particularFeat p : features)
        {
            total += p.getLogOdds();
        }
        return total;
    }
    
    
}
