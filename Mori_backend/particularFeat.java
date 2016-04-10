import java.util.Map;

public class particularFeat
{
    private Map<String, Double> feature;
    private String category;
    
    particularFeat(Map<String, Double> feature, String category)
    {
        this.feature = feature;
        this.category = category;
    }
    
    public double getLogOdds()
    {
        return feature.get( category );
    }
    
}
